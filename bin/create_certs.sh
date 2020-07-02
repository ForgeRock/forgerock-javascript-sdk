## Genertates self-signed certs for development/testing purposes only.
## DO NOT USE IN PRODUCTION!

mkdir -p tests/certs

# Generate the root key
openssl genrsa -des3 -out tests/e2e/certs/ca.key 2048

# Create a CA configuration file
echo \
"FQDN = fake-ca.com
ORGNAME = Fake Certificate Authority
ALTNAMES = DNS:\$FQDN

[ req ]
default_bits = 2048
default_md = sha256
prompt = no
encrypt_key = no
distinguished_name = dn
req_extensions = req_ext

[ dn ]
C = US
O = \$ORGNAME
CN = \$FQDN

[ req_ext ]
subjectAltName = \$ALTNAMES
"> tests/e2e/certs/ca.conf

# Generate a root certificate based on the root key
openssl req -x509 -new -nodes -key tests/e2e/certs/ca.key -sha256 -days 1825 \
  -out tests/e2e/certs/ca.crt -config tests/e2e/certs/ca.conf

# Generate a new private key
openssl genrsa -out tests/e2e/certs/samples.key 2048

# Create a CSR configuration file
echo \
"FQDN = sdk.example.com
ORGNAME = ForgeRock Samples
ALTNAMES = DNS:\$FQDN

[ req ]
default_bits = 2048
default_md = sha256
prompt = no
encrypt_key = no
distinguished_name = dn
req_extensions = req_ext

[ dn ]
C = US
O = \$ORGNAME
CN = \$FQDN

[ req_ext ]
subjectAltName = \$ALTNAMES
"> tests/e2e/certs/samples-csr.conf

# Generate a Certificate Signing Request (CSR) based on that private key
openssl req -new -key tests/e2e/certs/samples.key -out tests/e2e/certs/samples.csr \
  -config tests/e2e/certs/samples-csr.conf

# Create a configuration-file
echo \
"authorityKeyIdentifier = keyid,issuer
basicConstraints        = CA:FALSE
keyUsage                = digitalSignature,nonRepudiation,keyEncipherment,dataEncipherment
subjectAltName          = @alt_names

[alt_names]
DNS.1                   = *.example.com
"> tests/e2e/certs/samples-crt.conf

# Create the certificate for the webserver to serve
openssl x509 -req -in tests/e2e/certs/samples.csr -CA tests/e2e/certs/ca.crt -CAkey tests/e2e/certs/ca.key -CAcreateserial \
  -out tests/e2e/certs/samples.crt -days 1825 -sha256 -extfile tests/e2e/certs/samples-crt.conf
