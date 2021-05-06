export default function(context) {
  if (!context.$cookies.get('_us')) {
    if (!context.$cookies.get('_ui')) {
      context.redirect('/?auth=login')
    }
  }
}
