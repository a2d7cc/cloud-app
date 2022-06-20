module.exports = class UserDto {
    email;
    id;
    isActivated;
    avatar;
    diskSpace;
    availableSpace;
    
    constructor(model) {
        this.email = model.email
        this.isActivated = model.isActivated
        this.id = model._id
        this.avatar = model.avatar
        this.diskSpace = model.diskSpace
        this.usedSpace = model.usedSpace
    }
}