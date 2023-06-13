import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchValue: '',
    onShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchWebsite = event => {
    this.setState({searchValue: event.target.value})
  }

  onSubmitForm = event => {
    const {website, username, password} = this.state
    event.preventDefault()
    const colorsList = [
      'blue',
      'violet',
      'orange',
      'green',
      'purple',
      'lightGreen',
      'brown',
      'skyBlue',
    ]

    const randomColorValue = Math.ceil(Math.random() * colorsList.length - 1)

    const newItem = {
      id: uuidv4(),
      website,
      username,
      password,
      color: colorsList[randomColorValue],
    }

    if (username && website && password) {
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newItem],
        website: '',
        username: '',
        password: '',
      }))
    } else {
      alert('Pls enter Valid Data')
    }
  }

  onShowPassword = () => {
    this.setState(prevState => ({onShow: !prevState.onShow}))
  }

  onDelete = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: filteredList})
  }

  getRenderedList = () => {
    const {passwordList, searchValue, onShow} = this.state

    const filteredList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <ul className="password-list-container">
        {filteredList.map(eachItem => (
          <PasswordItem
            eachItem={eachItem}
            key={eachItem.id}
            onDelete={this.onDelete}
            onShow={onShow}
          />
        ))}
      </ul>
    )
  }

  getRenderedNoPassword = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-icon"
      />
      <p className="no-password">No Passwords</p>
    </div>
  )

  render() {
    const {
      passwordList,
      website,
      searchValue,
      username,
      password,
      onShow,
    } = this.state
    const filteredList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-card-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="head">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logo"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onChangeUserName}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-logo"
          />
        </div>
        <div className="password-item-card">
          <div className="password-data-search-container">
            <div className="password-data-container">
              <h1 className="passwords">Your Passwords</h1>
              <p className="count-of-passwords">{passwordList.length}</p>
            </div>
            <div className="input-container-search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo-search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onSearchWebsite}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              className="check-box"
              onClick={this.onShowPassword}
              value={onShow}
              id="password"
            />
            <label className="show-passwords" htmlFor="password">
              Show Passwords
            </label>
          </div>
          {filteredList.length > 0
            ? this.getRenderedList()
            : this.getRenderedNoPassword()}
        </div>
      </div>
    )
  }
}

export default PasswordManager

//
