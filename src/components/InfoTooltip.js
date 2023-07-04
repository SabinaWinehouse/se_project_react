import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function InfoTooltip({image, isOpen, onClose, text}) {
	return (
		<PopupWithForm
			name="tooltip"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="popup__tooltip-content">
				<div className={`popup__icon-${image}`}/>
				<p className="popup__tooltip-text">{text}</p>
			</div>
		</PopupWithForm>
	)
}
