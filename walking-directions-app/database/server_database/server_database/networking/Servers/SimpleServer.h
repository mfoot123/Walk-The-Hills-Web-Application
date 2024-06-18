#ifndef SIMPLESERVER
#define SIMPLESERVER


#include "../hdelibc-networking.h"

namespace HDE
{
	class SimpleServer
	{
	public:
		SimpleServer(int domain, int serivce, int protocol, int port, const char* ip, int backlog);
		~SimpleServer();

		virtual void launch() = 0;
		ListeningSocket* get_socket();

	private:
		ListeningSocket* socket;
		virtual void accepter() = 0;
		virtual void handler() = 0;
		virtual void responder() = 0;
	};

}

#endif // !SIMPLESERVER