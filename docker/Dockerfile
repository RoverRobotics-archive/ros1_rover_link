FROM arm64v8/ubuntu:18.04

ENV PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/lib/pkgconfig
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib

RUN apt-get update && apt-get install -y apt-utils git && apt-get -y install libmicrohttpd-dev libjansson-dev \
	libssl-dev libsrtp-dev libsofia-sip-ua-dev libglib2.0-dev \
	libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev \
	libconfig-dev pkg-config gengetopt libtool automake wget gtk-doc-tools libnice-dev cmake


RUN git clone https://github.com/sctplab/usrsctp && cd usrsctp && ./bootstrap \
&& ./configure --prefix=/usr && make && make install
RUN wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz && tar xfv v2.2.0.tar.gz && cd libsrtp-2.2.0 \
&& ./configure --prefix=/usr --enable-openssl && make shared_library && make install

RUN git clone https://libwebsockets.org/repo/libwebsockets && \
    cd libwebsockets && \
    mkdir build && \
    cd build && \
    cmake -DLWS_MAX_SMP=1 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" .. && \
    make && make install

RUN git clone https://github.com/meetecho/janus-gateway.git && cd janus-gateway && \
    sh autogen.sh && \
    ./configure --prefix=/opt/janus && \
    make && make install