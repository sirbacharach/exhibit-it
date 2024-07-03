const Error = (props) => {
    console.log(props)
    const {message} = props
    return (
        <div className="error">
            <h2>An Error!</h2>
            <p>{message}</p>
        </div>
    )
};

export default Error;