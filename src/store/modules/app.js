import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  theme: Cookies.get('theme') ? Cookies.get('theme') : 'white',
  navbarPosition: Cookies.get('navbar-position') ? Cookies.get('navbar-position') : 'left'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  SET_NAVBAR_POSITION: (state, position) => {
    state.navbarPosition = position
  }
}

const actions = {
  toggleSideBar({
    commit
  }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setTheme({
    commit
  }, theme) {
    Cookies.set('theme', theme)
    commit('SET_THEME', theme)
    document.body.className = 'theme-' + theme
  },
  setNavbarPosition({
    commit
  }, position) {
    Cookies.set('navbar-position', position)
    commit('SET_NAVBAR_POSITION', position)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
