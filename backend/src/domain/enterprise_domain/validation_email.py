def validate_email(email: str) -> bool:
    # Verifica se o valor é uma string
    if not isinstance(email, str):
        return False

    # Remove espaços no início e no final
    email = email.strip()

    # Verifica se está vazio
    if not email:
        return False

    # E-mails não podem conter espaços
    if " " in email:
        return False

    # Deve existir exatamente um @
    if email.count("@") != 1:
        return False

    local_part, domain = email.split("@")

    # Ambas as partes são obrigatórias
    if not local_part or not domain:
        return False

    # Não pode começar ou terminar com ponto
    if local_part.startswith(".") or local_part.endswith("."):
        return False

    if domain.startswith(".") or domain.endswith("."):
        return False

    # Não permite pontos consecutivos
    if ".." in email:
        return False

    # Caracteres permitidos na parte anterior ao @
    allowed_local_chars = (
        "abcdefghijklmnopqrstuvwxyz"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "0123456789"
        "!#$%&'*+-/=?^_`{|}~."
    )

    for char in local_part:
        if char not in allowed_local_chars:
            return False

    # O domínio deve possuir pelo menos um ponto
    if "." not in domain:
        return False

    # Caracteres permitidos no domínio
    allowed_domain_chars = (
        "abcdefghijklmnopqrstuvwxyz"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "0123456789"
        "-."
    )

    for char in domain:
        if char not in allowed_domain_chars:
            return False

    # Cada parte do domínio deve ser válida
    domain_parts = domain.split(".")

    for part in domain_parts:
        if not part:
            return False

        # Uma parte do domínio não pode começar ou terminar com hífen
        if part.startswith("-") or part.endswith("-"):
            return False

    # O domínio deve possuir uma extensão
    # Ex.: .com, .org, .com.br
    extension = domain_parts[-1]

    if len(extension) < 2:
        return False

    # A extensão deve conter somente letras
    for char in extension:
        if not char.isalpha():
            return False

    return True