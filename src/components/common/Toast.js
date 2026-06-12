

const Toast = ({ message }) => {
    return (
        <div className="toast">
        <i className="fa-solid fa-circle-check"></i>
        {message}
        </div>
    );
};

export default Toast;
