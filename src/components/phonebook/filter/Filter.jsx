export const Filter = ({ value, handleFilterChange }) => {
    return (
        <label style={{fontSize: "24px"}}>
            Find contacts by name
            <input
                type="text"
                value={value}
                style={{ display: 'block' }}
                onChange={handleFilterChange}
            />
        </label>
    );
};
