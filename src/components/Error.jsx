const Error = (props) => {
    console.log(props)
    const {message} = props
    return (
        <div className="text-center font-bold font-headers text-2xl pt-2 pb-1 flex flex-col">
            <h2 className="text-red-600">Error!</h2>
            <p>{message}</p>
        </div>
    )
};

export default Error;