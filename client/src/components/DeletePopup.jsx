import React from "react";
import cross from "/icon/cross.svg"

function DeletePopup(props) {

    const handleClosePopupDelete = () => {
        props.handleClose()
    }
    return (

        <div className="flex justify-center items-center fixed z-50 w-full h-full bg-black bg-opacity-50 inset-0" onClick={handleClosePopupDelete}>
            <div className="flex relative max-w-full h-auto bg-white rounded-3xl " onClick={(event) => event.stopPropagation()}>
                <div className="flex flex-col relative py-4">
                    <h1 className="text-xl font-semibold pb-4 px-6 ">Delete confirmation</h1>

                    <button onClick={handleClosePopupDelete}><img src={cross} alt="cross" className="w-4 h-4 flex absolute top-6 right-8" /></button>

                    <div className="flex w-full border-[1px] border-gray-300 rounded-[1px] h-full"></div>


                    <p className="text-gray-600 pl-6 pr-60 my-6">Do you sure to delete account?</p>
                    <div className="flex gap-5 px-6 pb-2">
                        <button className="bg-red-100 text-red-800 rounded-3xl p-3 font-semibold">Yes, I want to delete</button>
                        <button className="bg-red-800 text-white rounded-3xl p-3 font-semibold" onClick={handleClosePopupDelete}>No, I don't</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DeletePopup