export const styles = {

    progressBar: {
      top: "20px",
      right: "-1px",
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      width: "350px",
    },
}

export const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
    container: (provided) => ({
      ...provided,
      width: 500,
    }),
};