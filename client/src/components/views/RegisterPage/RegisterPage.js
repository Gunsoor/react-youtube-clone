import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [Email, setEmail] = useState('');
	const [Name, setName] = useState('');
	const [Password, setPassword] = useState('');
	const [ConfirmPassword, setConfirmPassword] = useState('');
	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};
	const onNameHandler = (e) => {
		setName(e.currentTarget.value);
	};
	const onPasswordHandler = (e) => {
		setPassword(e.currentTarget.value);
	};
	const onConfirmPasswordHandler = (e) => {
		setConfirmPassword(e.currentTarget.value);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (Password !== ConfirmPassword) {
			return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
		}

		let body = {
			email: Email,
			password: Password,
			name: Name,
		};

		dispatch(registerUser(body)).then((response) => {
			console.log(props);
			if (response.payload.success) {
				navigate('/login');
			} else {
				alert('Failed to sign up');
			}
		});
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={onSubmitHandler}
			>
				<label>Email</label>
				<input
					type="email"
					value={Email}
					onChange={onEmailHandler}
					autoComplete="off"
				/>
				<label>Name</label>
				<input
					type="text"
					value={Name}
					onChange={onNameHandler}
					autoComplete="off"
				/>
				<label>Password</label>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				<label>Confirm Password</label>
				<input
					type="password"
					value={ConfirmPassword}
					onChange={onConfirmPasswordHandler}
				/>

				<br />
				<button>Login</button>
			</form>
		</div>
	);
}

export default RegisterPage;
