function Button({ children, onClickDo }) {
    return <button className="button" onClick={onClickDo}>{children}</button>
}

export default Button;