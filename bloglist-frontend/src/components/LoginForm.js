const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          Username
        <input
          id='username'
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleUserChange}
        />
      </div>
      <div>
          Password
        <input
          id='password'
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">Login</button>
    </form>
  )
}

export default LoginForm