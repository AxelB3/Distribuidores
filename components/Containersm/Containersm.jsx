function Containersm({children, className}) {
    return (
        <>
           <div className={["flex justify-center flex-col", className].join(' ')}>
           {children}
           </div>
        </>
    );
}

export default Containersm