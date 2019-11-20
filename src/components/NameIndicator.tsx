import React from "react";

interface IProps {
    name: string;
}

export default function TimeIndicator(props: IProps) {
    return <span id="name" className="this-align-left column float-left">Name: {props.name}</span>;
}