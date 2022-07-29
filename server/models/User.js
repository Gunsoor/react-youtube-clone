const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRoiunds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlengh: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

// 스키마에 데이터를 저장하기 전에 실행할 함수
userSchema.pre('save', function (next) {
    let user = this;
    // 비밀번호가 변경되었을 때만
    if (user.isModified('password')) {
        //비밀번호 암호화
        bcrypt.genSalt(saltRoiunds, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    let user = this;
    // jwt를 이용해서 token을 생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    let user = this;
    jwt.verify(token, 'secretToken', function (err, decoded) {
        console.log('#err :', err);
        console.log('#decoded :', decoded);
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관 된 토큰이 일치하는지 확인
        user.findOne(
            {
                _id: decoded,
                token: token,
            },
            function (err, user) {
                console.log('Finded User:', user);
                if (err) return cb(err);
                cb(null, user);
            }
        );
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
