import { useNavigate } from "react-router-dom"
import Input from "../../components/common/Input";
import { useRef, useState } from "react";
import { useSellContext } from "../../contexts/SellContext";

export default function ListingPage(_props) {
    const [isLoading, setIsLoading] = useState(false)
    const { setListing } = useSellContext();
    const formRef = useRef(null)
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)

        if (formRef?.current) {
            const formData = new FormData(formRef.current);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log(data)
            setListing(data)
            // TODO upload to database
            navigate("/sell/confirmation/")
        }

        setIsLoading(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit} ref={formRef}>
                {/* TODO: Need to add input validation */}
                <Input
                    name="isbn"
                    label="ISBN"
                    placeholder={"978123345488777"}
                    type="number"
                    isLoading={isLoading}
                    required={true}
                />
                <Input
                    name="title"
                    label="Title"
                    placeholder={"Stats: Modeling the World"}
                    type="text"
                    isLoading={isLoading}
                    required={true}
                />
                <Input
                    name="edition"
                    label="Edition"
                    placeholder={"1"}
                    type="text"
                    isLoading={isLoading}
                />
                <Input
                    name="author"
                    label="Author"
                    placeholder={"John Smit"}
                    type="text"
                    isLoading={isLoading}
                />
                <Input
                    name="department"
                    label="Department"
                    placeholder={"BIO"}
                    type="text"
                    isLoading={isLoading}
                    required={true}
                />
                <Input
                    name="courseNumber"
                    label="Course Number"
                    placeholder={"101"}
                    type="text"
                    isLoading={isLoading}
                    required={true}
                />
                <Input
                    name="price"
                    label="Price"
                    placeholder={"10"}
                    type="number"
                    isLoading={isLoading}
                    required={true}
                />
                <Input
                    name="notes"
                    label="Notes (e.g., is an access code or CD included?)"
                    placeholder={"Access code included"}
                    type="text"
                    isLoading={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    Submit
                </button>
            </form>
        </>
    )
}