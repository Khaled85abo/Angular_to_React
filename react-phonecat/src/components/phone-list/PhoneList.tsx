import { useEffect, useState } from "react"
import { Phones } from "../../types/phone"
import { Link } from "react-router-dom"
const PhoneList = () => {
    const [query, setQuery] = useState('')
    const [orderProp, setOrderProp] = useState<"name" | "age">('age')
    const [phones, setPhones] = useState<Phones>([])
    const [filteredPhones, setFilteredPhones] = useState<Phones>([])

    const handleFilterPhones = () => {
        setFilteredPhones(phones
            .filter(phone => phone.name.toLowerCase().includes(query.toLowerCase()) || !query)
            .sort((a, b) => {
                if (orderProp === "name") {
                    return a.name.localeCompare(b.name)
                }
                return b.age - a.age
            }).reverse())
    }

    const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleSetOrderProp = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderProp(event.target.value as "name" | "age")
    }
    const handleFetchPhones = () => {
        fetch('/phones/phones.json')
            .then(response => response.json())
            .then(data => {
                setPhones(data)
                setFilteredPhones(data)
            })

    }
    useEffect(() => {
        handleFetchPhones()
    }, [])
    useEffect(() => {
        handleFilterPhones()
    }, [query, orderProp, phones])
    if (!phones || !filteredPhones) return null
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    {/* Sidebar content */}
                    <p>
                        Search:
                        <input value={query} onChange={handleSetQuery} />
                    </p>
                    <p>
                        Sort by:
                        <select value={orderProp} onChange={handleSetOrderProp}>
                            <option value="name">Alphabetical</option>
                            <option value="age">Newest</option>
                        </select>
                    </p>
                </div>
                <div className="col-md-10">
                    {/* Body content */}
                    <ul className="phones">
                        {filteredPhones.map(phone => (
                            <li className="thumbnail phone-list-item" key={phone.age}>
                                <Link to={`${phone.id}`} className="thumb">
                                    <img src={phone.imageUrl} alt={phone.name} />
                                </Link>
                                <Link to={`/phones/${phone.id}`}>{phone.name}</Link>
                                <p>{phone.snippet}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PhoneList