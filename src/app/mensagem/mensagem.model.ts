export enum MensagemTipo {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    light = 'light',
    dark = 'dark'
}

export class Mensagem {
    tipo: MensagemTipo;
    conteudo = '';
}
