// 判断登录
export default function({ store, redirect }) {
  if (store.state.user.access_token) {
    return redirect('/')
  }
}
