#include "SimpleServer.h"

HDE::SimpleServer::SimpleServer(int domain, int serivce, int protocol, int port, const char* ip, int backlog)
{
	this->socket = new ListeningSocket(domain, serivce, protocol, port, ip, backlog);
}

HDE::SimpleServer::~SimpleServer()
{
	delete this->socket;
}

HDE::ListeningSocket* HDE::SimpleServer::get_socket()
{
	return this->socket;
}
