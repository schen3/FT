import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Text } from 'react-native';

// const SelectLang = ({countries, countryLables, placeholder}) => {
const SelectLang = ({ collection, handleOnSelect }) => {
    const [selected, setSelected] = useState("");
    const onSelect = (selectedValue) => {
        setSelected(selectedValue);
        handleOnSelect(selectedValue);
    }
    return <div>
        <Text>{collection.label}: {selected}</Text>
        <ReactFlagsSelect
            countries={collection.countriesFlag}
            customLabels={collection.countryLables}
            selected={selected}
            onSelect={(selectedVal) => onSelect(selectedVal)}
            placeholder={collection.placeholder}
            searchable
            showSecondaryOptionLabel={true}
            selectedSize={20}
            optionsSize={18}
            fullWidth={true}
        /></div>
        ;
};

export default SelectLang;