#include "SimpleSocket.h"

HDE::SimpleSocket::SimpleSocket(int domain, int serivce, int protocol, int port, const char* ip)
{
	this->mAdress.sin_family = domain;
	// convert to byte expectations.
	this->mAdress.sin_port = htons(port);
	this->mAdress.sin_addr.s_addr = inet_addr(ip);

	//establish connection
	this->mSock = socket(domain, serivce, protocol);
	test_connection(mSock);
}

void HDE::SimpleSocket::test_connection(int item)
{
	if (item < 0)
	{
		perror("Failed to Connect");
		exit(EXIT_FAILURE);
	}
}

sockaddr_in HDE::SimpleSocket::get_address()
{
	return this->mAdress;
}

int HDE::SimpleSocket::get_sock()
{
	return this->mSock;
}

int HDE::SimpleSocket::get_connection()
{
	return this->mConnection;
}

void HDE::SimpleSocket::set_connection(int connection)
{
	this->mConnection = connection;
}
