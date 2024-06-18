#include "BindingSocket.h"

HDE::BindingSocket::BindingSocket(int domain, int serivce, int protocol, int port, const char* ip) : SimpleSocket(domain, serivce, protocol, port, ip)
{
	//establish network connection
	int connection = connect_to_network(get_sock(), get_address());
	test_connection(connection);
	set_connection(connection);
}

int HDE::BindingSocket::connect_to_network(int sock, sockaddr_in address)
{
	return bind(sock, (struct sockaddr*)&address, sizeof(address));
}