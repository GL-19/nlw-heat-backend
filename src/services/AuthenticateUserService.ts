import axios from "axios";

/*
 * Receber code(string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o user existe no database
 * -- Caso exista: Gerar um token
 * -- Caso não exista: Criar user no DB e então gerar um token
 * Retornar o token com as infos do user
 */

interface IAcessTokenResponse {
	access_token: string;
}

class AuthenticateUserService {
	async execute(code: string) {
		const url = "https://github.com/login/oauth/access_token";

		const { data: acessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
			params: {
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},
			headers: {
				Accept: "application/json",
			},
		});

		const response = axios.get("https://api.github.com/user", {
			headers: {
				authorization: `Bearer ${acessTokenResponse.access_token}`,
			},
		});

		return acessTokenResponse;
	}
}

export { AuthenticateUserService };
