import React, { useEffect, useRef, useState } from 'react';
import { BiCog } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TextInput } from './TextInput';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../styles/settings.css';

export const Settings = () => {

    const modalRef = useRef<any>(null);

    const onModalOpen = () => {
        if (modalRef.current) {
            modalRef.current.style.display = "flex";
        }
    }

    // Todo: just use a div instead of dialog
    return (
        <>
            <div className="settings-container">
                <button onClick={onModalOpen}>
                    <BiCog className="icon" />
                </button>
            </div>

            <div className="modal-overlay" ref={modalRef}>
                <div className="modal-inner">
                    <div className="d-flex justify-content-end">
                        <button>
                            <AiOutlineCloseCircle className="icon" />
                        </button>
                    </div>
                    <h2 className="settings-title">Settings</h2>
                    
                    <h3>Lists</h3>
                    <div className="d-flex mb-20">
                        <TextInput
                            name={`heypresto`}
                            id={`heypresto`}
                            label="input 1"
                            placeholder="test"
                        />
                        {/* Todo: fix that this is stretched */}
                        <button className="danger icon-button ml-20">
                            <RiDeleteBin6Line className="icon" />
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button>
                            <AiOutlinePlusCircle className="icon" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};