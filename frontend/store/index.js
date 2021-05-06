export const state = () => ({
  user: null,
  myOrders: [],
  settings: {}
});

export const mutations = {
  USER(state, payload) {
    state.user = payload
  },
  MYORDER(state, payload) {
    state.myOrders = payload
  },
  SETTINGS(state, payload) {
    state.settings = payload
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchSettings')
    if (!this.$cookies.get("_us")) {
      if (this.$cookies.get("_ui")) {
        await dispatch("fetchUser");
      }
      return false;
    }
    await dispatch("fetchUser");
  },
  async fetchSettings({ commit }) {
    const { status, data } = await this.$axios.get('/settings')
    
    if (Number(status) !== 200) {
      this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Приложение будет роботать не корректно. Из-за настроек'
      })
    } else {

      if (data.length === 0) {
        this.commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          text: 'Приложение будет роботать не корректно. Из-за настроек'
        })
      } else {

        commit('SETTINGS', data)
      }

    }
  },
  async fetchUser({ commit }, form){
    if (!this.$cookies.get('_ui')) {
      const {status, data} = await this.$axios.post('/auth/local', JSON.stringify({
        identifier: form ? form.email : this.$cookies.get('_us').login,
        password: form ? form.password : this.$cookies.get('_us').password,
      }))

      if (status !== 200) {
        //error
        if (data.statusCode === 400) {
          data.message.forEach(text => {
            text.messages.forEach(item => {
              // commit('ui/TYPEPOPUPS', {
              //   state: 'error',
              //   value: true,
              //   text: item.message
              // })
              this.$router.push('/?auth=login')
            })
          })
        }
        return false
      } else {
        this.$cookies.set('_uh', data.jwt, {
          path: '/',
        });
        if (!this.$cookies.get('_us')) {
          this.$cookies.set('_us', {
            login: form.email,
            password: form.password
          }, {
            path: '/',
          });
        }

        commit('USER', data.user)
        commit('ui/TYPEPOPUPS', {
          state: 'auth',
          value: false
        })

        return true
      }
    } else {
      const {status, data} = await this.$axios.get(`/users/${this.$cookies.get('_ui').id}`,{
        headers: {
          Authorization: 'Bearer '+this.$cookies.get('_uh')
        }
      })
      
      if (status === 200) {
        await commit('USER', data)
      }
    }
  },
  async fetchRegisterUser({ commit }, form) {
    const {status, data} = await this.$axios.post('/auth/local/register', JSON.stringify({
      username: form.name,
      email: form.email,
      password: form.password
    }))

    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            // commit('ui/TYPEPOPUPS', {
            //   state: 'error',
            //   value: true,
            //   text: 'проверьте правильность ввода данных или воспользуйтесь восстановлением пароля'
            // })

          })
        })
        return data
      }
    } else {
      this.$cookies.set('_uh', data.jwt, {
        path: '/',
      });

      if (!this.$cookies.get('_us')) {
        this.$cookies.set('_us', {login: data.user.email, password: form.password}, {
          path: '/',
        });
      }

      await commit('USER', data.user)
      await commit('ui/TYPEPOPUPS', {
        state: 'auth',
        value: false
      })
      await commit('ui/TYPEPOPUPS', {
        state: 'success',
        value: true,
        text: 'Регистрация прошла успешна. Теперь вы авторизованы.',
        title: 'Успешно'
      })
      await this.$router.push('/user/personal-data')
    }
  },
  async fetchUpdateUser({ commit }, payload) {
    const {status, data, config} = await this.$axios.put(`/users/${payload.id}`, JSON.stringify(payload.object), {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })
    console.log(status, data, config)
    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: item.message
            })
          })
        })
      }
    } else {
      if (data && Number(data.id) ===  Number(payload.id)) {
        await commit('USER', data)
        if (Object.keys(payload.object)[0] === 'password' || Object.keys(payload.object)[0] === 'email') {
          await this.$cookies.set('_us', {
            login: data.email,
            password: payload.object.password
          })
          return true
        }
        if (payload.popup !== false) {
          // console.log(payload.popup)
          // await commit('ui/TYPEPOPUPS', {
          //   state: 'error',
          //   value: true,
          //   title: 'Успешно',
          //   text: 'Данные успешно изменены.'
          // })
        }
      } else {
        await commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          text: 'Что-то пошло не так.'
        })
      }

    }
  },
  async UpdateUser({ commit }, payload) {
    const {status, data, config} = await this.$axios.put(`/users/${payload.id}`, JSON.stringify(payload.object), {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })

    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: item.message
            })
          })
        })
      }
    } else {
      if (data && Number(data.id) ===  Number(payload.id)) {
        await commit('USER', data)
        if (Object.keys(payload.object)[0] === 'password' || Object.keys(payload.object)[0] === 'email') {
          await this.$cookies.set('_us', {
            login: data.email,
            password: payload.object.password
          })
        }
      if (payload.popup !== false) {
        await commit('ui/TYPEPOPUPS', {
          state: 'success',
          value: true,
          text: 'Данные успешно изменены.',
          title: 'Успешно'
        })
      }
      } else {
        await commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          text: 'Что-то пошло не так.'
        })
      }

    }
  },

  async fetchAddOrganization({ commit }, payload) {
    const {status, data, config} = await this.$axios.put(`/users/${payload.id}`, {
      organization: [...payload.organization,{
        name: payload.name,
        inn: payload.inn
      }]
    }, {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })
    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: item.message
            })
          })
        })
      }
    } else {
      if (data && Number(data.id) ===  Number(payload.id)) {
        await commit('USER', data)
        await commit('ui/TYPEPOPUPS', {
          state: 'addOrganization',
          value: false
        })
      }
    }
  },
  async fetchAddAddresses({ commit }, payload) {
    const {status, data, config} = await this.$axios.put(`/users/${payload.id}`, {
      delivery_addresse: [...payload.delivery_addresse,{
        address: payload.address,
      }]
    }, {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })

    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: item.message
            })
          })
        })
      }
    } else {
      if (data && Number(data.id) ===  Number(payload.id)) {
        await commit('USER', data)
        await commit('ui/TYPEPOPUPS', {
          state: 'addAddresses',
          value: false
        })
      }
    }
  },

  async fetchUpdateOrganization({ commit }, payload) {
    if (!payload) {
      return false
    }


    const {status, data, config} = await this.$axios.put(`/users/${payload.id}`, {
      organization: payload.organization
    }, {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })

    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: item.message
            })
          })
        })
      }
    } else {
      if (data && Number(data.id) ===  Number(payload.id)) {
        await commit('USER', data)
        await commit('ui/TYPEPOPUPS', {
          state: 'addOrganization',
          value: false
        })
      }
    }
  },
  async fetchUpdateAddresse({ commit }, payload) {
    if (!payload) {
      return false
    }

    const {status, data, config} = await this.$axios.put(`/users/${payload.id}`, {
      delivery_addresse: payload.addresse
    }, {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })

    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        data.message.forEach(text => {
          text.messages.forEach(item => {
            commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: item.message
            })
          })
        })
      }
    } else {
      if (data && Number(data.id) ===  Number(payload.id)) {
        await commit('USER', data)
        await commit('ui/TYPEPOPUPS', {
          state: 'addOrganization',
          value: false
        })
      }
    }
  },

  async fetchMyOrders({ commit }, id) {
    if (!id) {
      return false
    }
    const {status, data, config} = await this.$axios.get(`/orders?idSearch=${id}`,  {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })

    if (status !== 200) {
      //error
      if (data.statusCode === 400) {
        commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          text: data.message
        })
      }
    } else {
        await commit('MYORDER', data)
    }
  },
  async deleteAccount({ commit }, id) {

    const {status, data, config} = await this.$axios.delete(`/users/${id}`, {
      headers: {
        Authorization: 'Bearer '+this.$cookies.get('_uh')
      }
    })
    if (status !== 200) {
      commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      await commit('ui/TYPEPOPUPS', {
        state: 'confirm',
        value: false
      })
      await commit('ui/TYPEPOPUPS', {
        state: 'success',
        value: true,
        text: 'Ваш аккаунт был удален.',
        title: 'Успешно'
      })
      this.$cookies.remove('_us')
      this.$cookies.remove('_uh')
      this.$router.push('/')
    }
  }
};

export const getters = {

}
