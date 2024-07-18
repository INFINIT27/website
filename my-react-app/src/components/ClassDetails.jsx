import "../styles/ClassDetails.css";

function ClassDetails({data}) {

    return(
        <div className="table-div">
            <table className="table">
                <tbody>
                    <tr>
                        <th>Class Number</th>
                        <th>Class Name</th>
                        <th>Class Description</th>
                    </tr>
                    {
                        data.map((val, key) => {
                            return(
                                <tr key={key}>
                                    <td>{val.class_number}</td>
                                    <td>{val.class_name}</td>
                                    <td>{val.class_description}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ClassDetails;