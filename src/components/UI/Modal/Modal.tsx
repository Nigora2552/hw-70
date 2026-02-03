import BackDrop from "../BackDrop/BackDrop.tsx";
import type {MouseEventHandler} from "react";

interface Props extends React.PropsWithChildren {
    show: boolean;
    close: MouseEventHandler;
}

const Modal: React.FC<Props> = ({show = false, children,close}) => {
    return (
        <>
            <BackDrop show={show}/>
            <div className='modal show' style={{display: show ? 'block' : 'none'}}>
                <div className='modal-dialog'>
                    <div className='modal-content h-auto'>
                            <button type='button' className='btn d-inline-block ms-auto' onClick={close}>X</button>
                        <div className='mx-2'>  {children}</div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Modal;