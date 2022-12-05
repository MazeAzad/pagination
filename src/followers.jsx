const Person = (person) => {
    let newPerson = person.probs;
    const { id, image, link, name } = newPerson;
    return <div className="person">
        <div className="imageContainer">
            <img src={image} alt="person image" />
        </div>
        <div className="name">
            {name}
        </div>
        <div className="link">
            <a href={link}>view more</a>
        </div>
    </div>
}

export default Person;