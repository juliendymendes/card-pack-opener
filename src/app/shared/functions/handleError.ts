import { HttpErrorResponse } from '@angular/common/http';

export default function handleError(error: HttpErrorResponse) {
	switch (error.status) {
		case 500:
			return 'Houve um erro de conexão com o servidor. Recarregue a página e tente novamente.';
		case 400:
			return 'Não foi possível recuperar os dados. Tente novamente mais tarde.';
		case 404:
			return 'O recurso solicitado não foi encontrado.';
		default:
			return 'Não foi possível recuperar os dados. Tente novamente mais tarde.';
	}
}
