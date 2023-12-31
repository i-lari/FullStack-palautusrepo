import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            id='username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm