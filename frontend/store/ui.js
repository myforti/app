export const state = () => ({
  popup: {
    auth: false,
    error: false,
    addOrganization: false,
    addAddresses: false,
    confirm: false,
    successOrder: false,
    consultation: false,
    editAddresse: false,
    success: false,
    feedback: false
  },
  editPopopOrganization: false,
  topMenuItem: ''
});

export const mutations = {
  TYPEPOPUPS(state, payload) {
    state.popup[payload.state] = payload.text || payload.title ? payload : payload.value
  },
  EDITORGANIZATION(state, payload) {
    state.editPopopOrganization = payload
  },
  TOPMENUOPEN(state, payload) {
    state.topMenuItem = payload
  }
};

