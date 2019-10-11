module.exports = profile => {
    const {
        id: googleId,
        name: {
            familyName: surname,
            givenName: name
        },
        photos: [{ 
            value: avatar
        }]
    } = profile;

    return {
        googleId,
        name,
        surname,
        avatar
    };
};