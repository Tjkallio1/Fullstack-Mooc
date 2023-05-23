const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
          Username
          <input
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleUserChange}
          />
        </div>
        <div>
          Password
          <input
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    )
}

export default LoginForm