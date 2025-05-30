create database db_diario_viagem_b;

use db_diario_viagem_b;

/* ---------- USUARIO ---------- */
create table tbl_usuario(
    id int primary key auto_increment,
    nome varchar(50) not null,
    username varchar(50) not null unique,
    email varchar(50) not null unique,
    senha varchar(20) not null,
    biografia varchar(200),
    data_conta timestamp default current_timestamp,
    palavra_chave varchar(100) not null,
    foto_perfil varchar(200),
    id_sexo int,
    id_nacionalidade int,
    foreign key(id_sexo) references tbl_sexo(id),
    foreign key(id_nacionalidade) references tbl_nacionalidade(id)
);

drop table tbl_usuario;
drop table tbl_sexo;
drop table tbl_nacionalidade;

/* ---------- SEXO ---------- */
create table tbl_sexo(
    id int primary key auto_increment,
    nome varchar(20) not null unique,
    sigla varchar(1) not null unique
);

/* ---------- NACIONALIDADE ---------- */
create table tbl_nacionalidade(
    id int primary key auto_increment,
    pais varchar(80) not null unique,
    sigla varchar(3) not null unique
);

/* ---------- CATEGORIA ---------- */
create table tbl_categoria(
    id int primary key auto_increment,
    nome_categoria varchar(45) not null
);

/* ---------- LOCAL ---------- */
CREATE TABLE tbl_local (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL, 
    latitude DECIMAL(10, 8),   
    longitude DECIMAL(11, 8),
    pais VARCHAR(100),      
    estado VARCHAR(100),       
    cidade VARCHAR(100)        
);
show tables;
desc tbl_viagem;
/* ---------- VIAGEM ---------- */

CREATE TABLE tbl_viagem (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario   INT NOT NULL,          -- dono da viagem
    titulo       VARCHAR(50)  NOT NULL,
    descricao    VARCHAR(200),
    data_inicio  DATE         NOT NULL,
    data_fim     DATE         NOT NULL,
    visibilidade ENUM('publica','privada') DEFAULT 'publica' not null,
    data_criacao timestamp DEFAULT current_timestamp,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id)
);

/* ---------- MÍDIA DA VIAGEM ---------- */

CREATE TABLE tbl_midia (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('foto','video') NOT NULL,
    url  TEXT      NOT NULL,
    id_viagem INT  NOT NULL,
    FOREIGN KEY (id_viagem) REFERENCES tbl_viagem(id)
);

/* ---------- RELACIONAMENTO VIAGEM ↔ LOCAL ---------- */

CREATE TABLE tbl_viagem_local (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    id_local   INT NOT NULL,
    id_viagem  INT NOT NULL,
    FOREIGN KEY (id_local)  REFERENCES tbl_local(id),
    FOREIGN KEY (id_viagem) REFERENCES tbl_viagem(id)
);

INSERT INTO tbl_viagem_local (
  id_viagem,
  id_local
) VALUES (
  3, 3
);
SELECT * FROM tbl_usuario ORDER BY id DESC LIMIT 1;


select * from tbl_viagem_local where id_viagem = 17;
SELECT id FROM tbl_viagem ORDER BY id DESC LIMIT 1;

/* ---------- RELACIONAMENTO VIAGEM ↔ CATEGORIA ---------- */

CREATE TABLE tbl_categoria_viagem (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_viagem    INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id),
    FOREIGN KEY (id_viagem)    REFERENCES tbl_viagem(id)
);


INSERT INTO tbl_nacionalidade (pais, sigla) VALUES
('Afeganistão', 'AFG'),
('África do Sul', 'ZAF'),
('Albânia', 'ALB'),
('Alemanha', 'DEU'),
('Andorra', 'AND'),
('Angola', 'AGO'),
('Anguilla', 'AIA'),
('Antártida', 'ATA'),
('Antígua e Barbuda', 'ATG'),
('Arábia Saudita', 'SAU'),
('Argélia', 'DZA'),
('Argentina', 'ARG'),
('Armênia', 'ARM'),
('Aruba', 'ABW'),
('Austrália', 'AUS'),
('Áustria', 'AUT'),
('Azerbaijão', 'AZE'),
('Bahamas', 'BHS'),
('Bahrein', 'BHR'),
('Bangladesh', 'BGD'),
('Barbados', 'BRB'),
('Belarus', 'BLR'),
('Bélgica', 'BEL'),
('Belize', 'BLZ'),
('Benim', 'BEN'),
('Bermudas', 'BMU'),
('Butão', 'BTN'),
('Bolívia', 'BOL'),
('Bonaire, Sint Eustatius e Saba', 'BES'),
('Bósnia e Herzegovina', 'BIH'),
('Botsuana', 'BWA'),
('Ilha Bouvet', 'BVT'),
('Brasil', 'BRA'),
('Brunei Darussalam', 'BRN'),
('Bulgária', 'BGR'),
('Burkina Faso', 'BFA'),
('Burundi', 'BDI'),
('Cabo Verde', 'CPV'),
('Camboja', 'KHM'),
('Camarões', 'CMR'),
('Canadá', 'CAN'),
('Ilhas Cayman', 'CYM'),
('República Centro-Africana', 'CAF'),
('Chade', 'TCD'),
('Chile', 'CHL'),
('China', 'CHN'),
('Ilha Christmas', 'CXR'),
('Ilhas Cocos (Keeling)', 'CCK'),
('Colômbia', 'COL'),
('Comores', 'COM'),
('Congo (República Democrática do)', 'COD'),
('Congo (República do)', 'COG'),
('Ilhas Cook', 'COK'),
('Coreia (República Popular Democrática da)', 'PRK'),
('Coreia (República da)', 'KOR'),
('Costa do Marfim', 'CIV'),
('Costa Rica', 'CRI'),
('Croácia', 'HRV'),
('Cuba', 'CUB'),
('Curaçao', 'CUW'),
('Chipre', 'CYP'),
('Chéquia', 'CZE'),
('Dinamarca', 'DNK'),
('Djibouti', 'DJI'),
('Dominica', 'DMA'),
('República Dominicana', 'DOM'),
('Equador', 'ECU'),
('Egito', 'EGY'),
('El Salvador', 'SLV'),
('Guiné Equatorial', 'GNQ'),
('Eritreia', 'ERI'),
('Estônia', 'EST'),
('Essuatíni', 'SWZ'),
('Etiópia', 'ETH'),
('Ilhas Falkland (Malvinas)', 'FLK'),
('Ilhas Faroe', 'FRO'),
('Fiji', 'FJI'),
('Finlândia', 'FIN'),
('França', 'FRA'),
('Guiana Francesa', 'GUF'),
('Polinésia Francesa', 'PYF'),
('Territórios Franceses do Sul', 'ATF'),
('Gabão', 'GAB'),
('Gâmbia', 'GMB'),
('Geórgia', 'GEO'),
('Gana', 'GHA'),
('Gibraltar', 'GIB'),
('Grécia', 'GRC'),
('Groenlândia', 'GRL'),
('Granada', 'GRD'),
('Guadalupe', 'GLP'),
('Guam', 'GUM'),
('Guatemala', 'GTM'),
('Guernsey', 'GGY'),
('Guiné', 'GIN'),
('Guiné-Bissau', 'GNB'),
('Guiana', 'GUY'),
('Haiti', 'HTI'),
('Ilha Heard e Ilhas McDonald', 'HMD'),
('Santa Sé (Cidade do Vaticano)', 'VAT'),
('Honduras', 'HND'),
('Hong Kong', 'HKG'),
('Hungria', 'HUN'),
('Islândia', 'ISL'),
('Índia', 'IND'),
('Indonésia', 'IDN'),
('Irã (República Islâmica do)', 'IRN'),
('Iraque', 'IRQ'),
('Irlanda', 'IRL'),
('Ilha de Man', 'IMN'),
('Israel', 'ISR'),
('Itália', 'ITA'),
('Jamaica', 'JAM'),
('Japão', 'JPN'),
('Jersey', 'JEY'),
('Jordânia', 'JOR'),
('Cazaquistão', 'KAZ'),
('Quênia', 'KEN'),
('Kiribati', 'KIR'),
('Kuwait', 'KWT'),
('Quirguistão', 'KGZ'),
('Laos (República Democrática Popular do)', 'LAO'),
('Letônia', 'LVA'),
('Líbano', 'LBN'),
('Lesoto', 'LSO'),
('Libéria', 'LBR'),
('Líbia', 'LBY'),
('Liechtenstein', 'LIE'),
('Lituânia', 'LTU'),
('Luxemburgo', 'LUX'),
('Macau', 'MAC'),
('Madagascar', 'MDG'),
('Malawi', 'MWI'),
('Malásia', 'MYS'),
('Maldivas', 'MDV'),
('Mali', 'MLI'),
('Malta', 'MLT'),
('Ilhas Marshall', 'MHL'),
('Martinica', 'MTQ'),
('Mauritânia', 'MRT'),
('Maurício', 'MUS'),
('Mayotte', 'MYT'),
('México', 'MEX'),
('Micronésia (Estados Federados da)', 'FSM'),
('Moldávia (República da)', 'MDA'),
('Mônaco', 'MCO'),
('Mongólia', 'MNG'),
('Montenegro', 'MNE'),
('Montserrat', 'MSR'),
('Marrocos', 'MAR'),
('Moçambique', 'MOZ'),
('Myanmar', 'MMR'),
('Namíbia', 'NAM'),
('Nauru', 'NRU'),
('Nepal', 'NPL'),
('Países Baixos', 'NLD'),
('Nova Caledônia', 'NCL'),
('Nova Zelândia', 'NZL'),
('Nicarágua', 'NIC'),
('Níger', 'NER'),
('Nigéria', 'NGA'),
('Niue', 'NIU'),
('Ilha Norfolk', 'NFK'),
('Macedônia do Norte', 'MKD'),
('Ilhas Marianas do Norte', 'MNP'),
('Noruega', 'NOR'),
('Omã', 'OMN'),
('Paquistão', 'PAK'),
('Palau', 'PLW'),
('Palestina, Estado da', 'PSE'),
('Panamá', 'PAN'),
('Papua Nova Guiné', 'PNG'),
('Paraguai', 'PRY'),
('Peru', 'PER'),
('Filipinas', 'PHL'),
('Pitcairn', 'PCN'),
('Polônia', 'POL'),
('Portugal', 'PRT'),
('Porto Rico', 'PRI'),
('Catar', 'QAT'),
('Reunião', 'REU'),
('Romênia', 'ROU'),
('Federação Russa', 'RUS'),
('Ruanda', 'RWA'),
('São Bartolomeu', 'BLM'),
('Santa Helena, Ascensão e Tristão da Cunha', 'SHN'),
('São Cristóvão e Neves', 'KNA'),
('Santa Lúcia', 'LCA'),
('São Martinho (Parte Francesa)', 'MAF'),
('São Pedro e Miquelão', 'SPM'),
('São Vicente e Granadinas', 'VCT'),
('Samoa', 'WSM'),
('San Marino', 'SMR'),
('São Tomé e Príncipe', 'STP'),
('Senegal', 'SEN'),
('Sérvia', 'SRB'),
('Seychelles', 'SYC'),
('Serra Leoa', 'SLE'),
('Singapura', 'SGP'),
('Sint Maarten (Parte Holandesa)', 'SXM'),
('Eslováquia', 'SVK'),
('Eslovênia', 'SVN'),
('Ilhas Salomão', 'SLB'),
('Somália', 'SOM'),
('Geórgia do Sul e Ilhas Sandwich do Sul', 'SGS'),
('Sudão do Sul', 'SSD'),
('Espanha', 'ESP'),
('Sri Lanka', 'LKA'),
('Sudão', 'SDN'),
('Suriname', 'SUR'),
('Svalbard e Jan Mayen', 'SJM'),
('Suécia', 'SWE'),
('Suíça', 'CHE'),
('República Árabe Síria', 'SYR'),
('Taiwan, Província da China', 'TWN'),
('Tajiquistão', 'TJK'),
('Tanzânia, República Unida da', 'TZA'),
('Tailândia', 'THA'),
('Timor-Leste', 'TLS'),
('Togo', 'TGO'),
('Tokelau', 'TKL'),
('Tonga', 'TON'),
('Trinidade e Tobago', 'TTO'),
('Tunísia', 'TUN'),
('Turquia', 'TUR'),
('Turcomenistão', 'TKM'),
('Ilhas Turks e Caicos', 'TCA'),
('Tuvalu', 'TUV'),
('Uganda', 'UGA'),
('Ucrânia', 'UKR'),
('Emirados Árabes Unidos', 'ARE'),
('Reino Unido', 'GBR'),
('Estados Unidos', 'USA'),
('Ilhas Menores Distantes dos Estados Unidos', 'UMI'),
('Uruguai', 'URY'),
('Uzbequistão', 'UZB'),
('Vanuatu', 'VUT'),
('Venezuela (República Bolivariana da)', 'VEN'),
('Vietnã', 'VNM'),
('Ilhas Virgens (Britânicas)', 'VGB'),
('Ilhas Virgens (E.U.A.)', 'VIR'),
('Wallis e Futuna', 'WLF'),
('Saara Ocidental', 'ESH'),
('Iêmen', 'YEM'),
('Zâmbia', 'ZMB'),
('Zimbábue', 'ZWE');