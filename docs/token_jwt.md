# JWT Json Web Token
Es para validar credenciales y mantener una "sesión". 
Este token es una clave temporal que va a tener un hasheada la clave publica y una privada.

## Instalación

```bash
npm install jsonwebtoken
npm install bcrypt
```
## Configuración .env
```conf
SECRET_KEY=miclavesecreta
```

## Código
Agregar campo "contraseña" en modelo usuario.

### Importar dependencias
```js
{
    // Este es un ejemplo en el controller del user
    import bcrypt from "bcrypt";
    import jsonwebtoken from "jsonwebtoken";
}
```

#### Extra: Encriptación de variable
```js
// Este es un ejemplo en el controller del user
{
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
}
```

### Agregar al controller el "método de token"
```js
const auth =  async (request, response) => {
    const { email, password} = request.body;
    const user = await User.findOne({email: email});

    if(!user){
        return response.status(404).json({msg: "El usuario es inválido"});
    }

    const passOk = bcrypt.compare(password, user.password);

    if(!passOk){
        return response.status(404).json({msg: "Contraseña inválida"});
    }

    // Generacion de Token
    const data = {
        id: user._id,
        email: user.email
    }
    const jwt = jsonwebtoken.sign(data, secret_key, {expiresIn: '1h'});

    response.json({msg: "Credenciales correctas", token: jwt});
}
```

## Archivos funcionales de la documentacion oficial
```json
// Header
{
    "alg": "HS256", //algoritmo estándar de encriptado
    "typ": "JWT"
}
```

```json
// Payload
{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}
```

```txt
// Verify signature
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret
) secret base54 encoded
```
