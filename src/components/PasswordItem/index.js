import './index.css'

const PasswordItem = props => {
  const {eachItem, onDelete, onShow} = props
  const {website, username, password, id, color} = eachItem
  const firstLetter = website.slice(0, 1)

  const onDeleteItem = () => {
    onDelete(id)
  }

  const onShowPassword = !onShow ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-icon"
    />
  ) : (
    <p className="password">{password}</p>
  )

  return (
    <li className="password-item-container">
      <div className="data-delete-container">
        <div className="letter-data-container">
          <p className={`first-letter ${color}`}>{firstLetter}</p>
          <div className="data-container">
            <p className="website">{website}</p>
            <p className="username">{username}</p>
            {onShowPassword}
          </div>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={onDeleteItem}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
