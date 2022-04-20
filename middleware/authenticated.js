
// 必須已登入
export default function({ app, store, redirect, error }) {
  const access_token = store.state.user.access_token;
  const url = app.context.route.fullPath;
  if (!access_token) {
    return redirect(`/login`);
  }
}
