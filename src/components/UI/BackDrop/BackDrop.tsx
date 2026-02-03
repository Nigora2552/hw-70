interface Props {
    show: boolean;
}

const BackDrop:React.FC<Props> = ({show}) => {
    return (
        <div className='modal-backdrop show' style={{display: show ? 'block' : 'none'}}></div>
    );
};

export default BackDrop;