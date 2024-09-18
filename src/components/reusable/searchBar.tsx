'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import '../reusable/searchBox.css';

interface FieldProps {
    label: string;
    type: string;
    name: string;
    onChange?: (value: string) => void;
    maxLength?: number;
    disabled: boolean;
    value: string | undefined;
    width?: string;
    height?: string;
    from?: string;
    className?: string;
}

const DynamicSearchField: React.FC<FieldProps> = ({ label, type, value, onChange, maxLength, disabled, width, height, from, className }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        if (value.charAt(0) === ' ') {
            e.target.value = value.substring(1);
            return;
        }
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleClear = () => {
        setInputValue('');
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div className={`form-group ${className ?? ""}`} style={{ width: width ? width : '236px' }}>
            <div style={{ height: from === 'employee' ? '43px' : '36px' }} className="search-field-container" >
                <input
                    type={type}
                    placeholder={label}
                    maxLength={maxLength}
                    value={inputValue}
                    onChange={handleChange}
                    className="search-field"
                    disabled={disabled}
                />
                <div onClick={inputValue ? handleClear : undefined} className="icon-container">
                    {inputValue ? <span className='mgc_close_fill' style={{ fontSize: 18, cursor: 'pointer' }}></span> : <span className='mgc_search_line' style={{ fontSize: 18 }}></span>}
                </div>
            </div>
        </div>
    );
};

export default DynamicSearchField;