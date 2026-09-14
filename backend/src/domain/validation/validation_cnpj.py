def validate_cnpj(cnpj: str) -> bool:
    # Verifica se o valor é uma string
    if not isinstance(cnpj, str):
        return False

    # Remove espaços
    cnpj = cnpj.strip()

    # Remove caracteres de máscara
    cnpj = (
        cnpj
        .replace(".", "")
        .replace("/", "")
        .replace("-", "")
    )

    # CNPJ deve possuir exatamente 14 dígitos
    if len(cnpj) != 14:
        return False

    # Todos os caracteres devem ser numéricos
    if not cnpj.isdigit():
        return False

    # Rejeita CNPJs formados pelo mesmo número
    if cnpj == cnpj[0] * 14:
        return False

    # Converte os caracteres para números
    digits = [int(digit) for digit in cnpj]

    # -------------------------
    # Primeiro dígito verificador
    # -------------------------

    weights_first = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    total = sum(
        digit * weight
        for digit, weight in zip(digits[:12], weights_first)
    )

    remainder = total % 11

    first_digit = 0 if remainder < 2 else 11 - remainder

    # Compara com o primeiro dígito verificador
    if first_digit != digits[12]:
        return False

    # -------------------------
    # Segundo dígito verificador
    # -------------------------

    weights_second = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    total = sum(
        digit * weight
        for digit, weight in zip(digits[:13], weights_second)
    )

    remainder = total % 11

    second_digit = 0 if remainder < 2 else 11 - remainder

    # Compara com o segundo dígito verificador
    if second_digit != digits[13]:
        return False

    return True