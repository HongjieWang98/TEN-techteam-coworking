import { useNavigate } from "react-router-dom"

export default function ListingPage(_props) {
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();

        navigate("/sell/confirmation/")
    }

    return (
        <>
            Hello there
            <form onSubmit={handleSubmit}>
                Some form with no inputs
                <button type="submit">
                    Submit
                </button>
            </form>
        </>
    )
}