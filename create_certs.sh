mkdir -p certs

# Generate the root key
openssl genrsa -des3 -out certs/ca.key 2048

# Create a CA configuration file
echo \
"FQDN = forgerock-sdk-samples-ca.com
ORGNAME = ForgeRock SDK Samples CA
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
"> certs/ca.conf

# Generate a root certificate based on the root key
openssl req -x509 -new -nodes -key certs/ca.key -sha256 -days 1825 \
  -out certs/ca.crt -config certs/ca.conf

# Generate a new private key
openssl genrsa -out certs/samples.key 2048

# Create a CSR configuration file
echo \
"FQDN = forgerock-sdk-samples.com
ORGNAME = ForgeRock SDK Samples
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
"> certs/samples-csr.conf

# Generate a Certificate Signing Request (CSR) based on that private key
openssl req -new -key certs/samples.key -out certs/samples.csr \
  -config certs/samples-csr.conf

# Create a configuration-file
echo \
"authorityKeyIdentifier = keyid,issuer
basicConstraints        = CA:FALSE
keyUsage                = digitalSignature,nonRepudiation,keyEncipherment,dataEncipherment
subjectAltName          = @alt_names

[alt_names]
DNS.1                   = forgerock-sdk-samples.com
"> certs/samples-crt.conf

# Create the certificate for the webserver to serve
openssl x509 -req -in certs/samples.csr -CA certs/ca.crt -CAkey certs/ca.key -CAcreateserial \
  -out certs/samples.crt -days 1825 -sha256 -extfile certs/samples-crt.conf
