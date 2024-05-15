import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

export default function handleError(
	error: HttpErrorResponse,
	alertService: AlertService,
) {
	switch (error.status) {
		case 500:
			alertService.showAlert(
				'Houve um erro de conexão com o servidor. Recarregue a página e tente novamente.',
				'error',
			);
			break;
		case 400:
			alertService.showAlert(
				'Não foi possível recuperar os dados. Tente novamente mais tarde.',
				'error',
			);
			break;
		case 404:
			alertService.showAlert(
				'O recurso solicitado não foi encontrado.',
				'error',
			);
			break;
		default:
			alertService.showAlert(
				'Não foi possível recuperar os dados. Tente novamente mais tarde.',
				'error',
			);
	}
}
