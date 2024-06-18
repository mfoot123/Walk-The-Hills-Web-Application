#include "ListeningSocket.h"

HDE::ListeningSocket::ListeningSocket(int domain, int serivce, int protocol, int port, const char* ip, int backlog) : BindingSocket(domain, serivce, protocol, port, ip)
{
	this->mBacklog = backlog;
	startListening();
	test_connection(this->mListening);

}

void HDE::ListeningSocket::startListening()
{
	this->mListening = listen(get_sock(), this->mBacklog);
}
