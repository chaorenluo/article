// 判断登录
export default function({ store, redirect }) {
console.log("中间件",store.state.user)
  if (store.state.user.access_token) {
    return redirect('/')
  }
}
