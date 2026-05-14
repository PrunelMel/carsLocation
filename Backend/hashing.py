from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
   
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
   
    return pwd_context.verify(plain_password, hashed_password)


def _hash(texte, taille_octets=16):
    """
    Génère un hachage de taille configurable.
    
    :param texte: La chaîne de caractères à hacher.
    :param taille_octets: La taille de sortie désirée en octets (1-32).
    :return: Une chaîne hexadécimale du hachage.
    """
    # BLAKE2s est idéal pour des hachages de taille variable
    h = hashlib.blake2s(digest_size=taille_octets)
    h.update(texte.encode('utf-8'))
    return h.hexdigest()