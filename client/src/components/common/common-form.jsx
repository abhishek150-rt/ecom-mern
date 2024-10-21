import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, handleSubmit, btnText,isNotValid }) => {
    const handleChange = (name) => (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.value,
        }));
    };

    const renderInputByItemType = (item) => {
        const value = formData[item.name] || "";

        switch (item.componentType) {
            case "input":
                return (
                    <Input
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        type={item.type}
                        value={value}
                        onChange={handleChange(item.name)}
                    />
                );

            case "select":
                return (
                    <Select
                        onValueChange={(val) => setFormData((prevData) => ({
                            ...prevData,
                            [item.name]: val,
                        }))}
                        value={value}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={item.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {item.options?.map(optionItem => (
                                <SelectItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "textarea":
                return (
                    <Textarea
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        value={value}
                        onChange={handleChange(item.name)}
                    />
                );

            default:
                return (
                    <Input
                        name={item.name}
                        id={item.name}
                        placeholder={item.placeholder}
                        type={item.type}
                        value={value}
                        onChange={handleChange(item.name)}
                    />
                );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                {formControls?.map((item, index) => (
                    <div key={index} className="grid w-full gap-1.5">
                        <Label className="mb-1">{item.label}</Label>
                        {renderInputByItemType(item)}
                    </div>
                ))}
            </div>
            <Button className="mt-2 w-full" type="submit"disabled={isNotValid}>
                {btnText || 'Submit'}
            </Button>
        </form>
    );
};
export default CommonForm;