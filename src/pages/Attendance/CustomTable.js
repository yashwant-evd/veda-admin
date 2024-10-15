import "./styles.css";

const CustomTable = () => {
  const attendance = {
    totalDates: ["12-05-24", "12-05-24", "12-05-24", "12-05-24"],
    data: [
      {
        id: 1,
        batchName: "Test Batch 1",
        batchId: 1,
        name: "ABC",
        dates: ["A", "13", "NA", "P"],
      },
      {
        id: 2,
        batchName: "Test Batch 1",
        batchId: 1,
        name: "ABCD",
        dates: ["12", "13", "14", "15"],
      },
    ],
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Batch Name</th>
            <th>Batch ID</th>
            <th>Name</th>
            {attendance?.totalDates?.map((date) => (
              <th>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendance?.data?.map((item) => (
            <tr key={item.id}>
              <td>{item.batchName}</td>
              <td>{item.batchId}</td>
              <td>{item.name}</td>

              {item.dates.map((date, index) => (
                <td>{date} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
